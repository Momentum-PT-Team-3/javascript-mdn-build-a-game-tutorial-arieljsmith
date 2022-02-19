import json
from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import render
from .models import Score
from .forms import ScoreForm


def index(request):
    score_form = ScoreForm()
    return render(request, 'index.html', {'score_form': score_form})


def ajax_create_score(request):
    if request.method == "POST":
        score = request.POST.get('score')
        initials = request.POST.get('initials')
        new_score = Score.objects.get_or_create(points=score, player=initials)
        data = serializers.serialize("json", [new_score[0]])
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'method': 'sup my guys, gals, and nonbinary pals'})
