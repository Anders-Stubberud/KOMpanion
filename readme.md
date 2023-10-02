# README

## Creator

This program is created by Anders Stubberud, an eager cyclist and second-year computer science student at [NTNU](https://www.ntnu.edu/).

## Limitations in precision

### Estimating wattage

Since the Strava API v3 does not provide wattage for the KOM of a given segment, I had to make a script for calculating it based on the metrics which are provided. The relevant metrics for this calculation were time, distance, and average gradient. (The script also has a function for determining air density based on elevation and temperature, but this has not yet been implemented into the estimation of wattage; currently, a constant is used for air density.) From there, textbook formulas have been used to determine the wattage. Since the calculation assumes linearity in the gradient, it is not entirely accurate, yet it provides an estimation.

### Determining relative percentage

Comparison of segments requires a way to compare the KOMs based on 2 variables: duration and wattage. In order to establish a foundation for comparison based on these metrics, this program applies the provided metrics to a model based on the dataset of the power curve created by [cycling analytics](https://www.cyclinganalytics.com/blog/2018/06/how-does-your-cycling-power-output-compare), yielding a relative percentage. The segments are compared based on this relative percentage. Cycling analytics does not provide programmatically access to all the data making up the power curve. They have, however, published a smaller dataset, which contains the data on selected entries. In an attempt to more precisely replicate the full power curve, the dataset used in this program is created from a [linear regression](https://github.com/Anders-Stubberud/KOMpanion/blob/main/backend/create_power_curve.py) on the smaller dataset, thus providing a more precise representation of the relative effort than the smaller dataset, yet not as precise as the dataset making up the power curve.

## Power Curves

![Absolute Power Curve](/frontend/public/images/absolute_curve.PNG)
_Absolute power curve_

![Relative Power Curve](/frontend/public/images/relative_curve.PNG)

_Relative power curve_
