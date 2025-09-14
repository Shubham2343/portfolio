#!/usr/bin/env python
"""
Script to collect static files for production deployment
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
    django.setup()
    
    # Collect static files
    execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])
    
    print("Static files collected successfully!")
    print("You can now serve the static files from the 'staticfiles' directory.")

