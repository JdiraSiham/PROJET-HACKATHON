from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import SkinImageViewSet, RoutineViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'skin-images', SkinImageViewSet)
router.register(r'routines', RoutineViewSet)

from api.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', home),  # <-- ajoute cette ligne
]


# Pour servir les fichiers médias en dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
