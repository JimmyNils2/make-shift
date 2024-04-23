from django.urls import path
from . import views

urlpatterns = [
    path('events/', views.AllEventList.as_view(), name='event-list'),
    path('my-events/', views.EventListCreate.as_view(), name='my-event-list'),
    path('my-details/', views.UserDetail.as_view(), name='my-details'),
    path('events/<int:pk>/', views.EventUpdate.as_view(), name='event-update'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('event/delete/<int:pk>/', views.EventDelete.as_view(), name='delete-event')
]