from django import forms
from .models import Score

# INITIAL VERSION
# class ScoreForm(forms.ModelForm):
#     class Meta:
#         model = Score
#         fields = ['points', 'player']
#         help_text = {
#             'player': 'Enter your initials',
#         }


class ScoreForm(forms.Form):
    initials = forms.CharField(max_length=5)
