"""
    tern URL Configuration
"""
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('users.urls')),
    path('posts/', include('posts.urls')),
    path('communities/', include('communities.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
