from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.utils import timezone
from .models import ContactSubmission, PageView, ProjectView
import logging

logger = logging.getLogger(__name__)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def track_page_view(request, page_name):
    ip = get_client_ip(request)
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    PageView.objects.create(
        page_name=page_name,
        ip_address=ip,
        user_agent=user_agent
    )


def home(request):
    track_page_view(request, 'home')
    return render(request, 'main/home.html')


def services(request):
    track_page_view(request, 'services')
    return render(request, 'main/services.html')


def projects(request):
    track_page_view(request, 'projects')
    return render(request, 'main/projects.html')


def contact(request):
    track_page_view(request, 'contact')
    
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            # Save to database
            submission = ContactSubmission.objects.create(
                name=name,
                email=email,
                message=message
            )
            
            # Send auto-response email
            try:
                send_mail(
                    'Thank you for contacting us!',
                    f'Hi {name},\n\nThank you for reaching out! We have received your message and will get back to you within 24 hours.\n\nBest regards,\nThe Team',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
            except Exception as e:
                logger.error(f"Failed to send auto-response email: {e}")
            
            # Send admin notification
            try:
                send_mail(
                    'New Contact Form Submission',
                    f'Name: {name}\nEmail: {email}\nMessage: {message}',
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.DEFAULT_FROM_EMAIL],  # Admin email
                    fail_silently=False,
                )
            except Exception as e:
                logger.error(f"Failed to send admin notification: {e}")
            
            messages.success(request, 'Thank you for your message! We will get back to you soon.')
            return redirect('/contact/?success=true')
        else:
            messages.error(request, 'Please fill in all fields.')
    
    return render(request, 'main/contact.html')


def track_project_view(request, project_name):
    if request.method == 'POST':
        ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        ProjectView.objects.create(
            project_name=project_name,
            ip_address=ip,
            user_agent=user_agent
        )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'})

