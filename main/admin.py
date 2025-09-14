from django.contrib import admin
from .models import ContactSubmission, PageView, ProjectView


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'submitted_at', 'is_processed']
    list_filter = ['is_processed', 'submitted_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['submitted_at']


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ['page_name', 'ip_address', 'viewed_at']
    list_filter = ['page_name', 'viewed_at']
    search_fields = ['page_name', 'ip_address']
    readonly_fields = ['viewed_at']


@admin.register(ProjectView)
class ProjectViewAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'ip_address', 'viewed_at']
    list_filter = ['project_name', 'viewed_at']
    search_fields = ['project_name', 'ip_address']
    readonly_fields = ['viewed_at']

