from django.db import models
from django.utils import timezone


class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(default=timezone.now)
    is_processed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.name} - {self.email}"


class PageView(models.Model):
    page_name = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    viewed_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-viewed_at']
    
    def __str__(self):
        return f"{self.page_name} - {self.ip_address}"


class ProjectView(models.Model):
    project_name = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    viewed_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-viewed_at']
    
    def __str__(self):
        return f"{self.project_name} - {self.ip_address}"

