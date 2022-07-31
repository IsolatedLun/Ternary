from django.urls import path
from . import views

urlpatterns = [
    path('relevant', views.RelavantCommunitiesView.as_view(),
         name='relevant-communities'),

    path('<int:community_id>', views.CommunityView.as_view(),
         name='relevant-communities'),

    path('<int:community_id>/top/members', views.TopCommunityMembersView.as_view(),
         name='top-community-members')
]
