from django.contrib import admin
from apps.users.models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'birth_date', 'date_joined']

