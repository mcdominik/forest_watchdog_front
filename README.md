# forest_watchdog_front




## What it is?

The purpose of this app is to detect fire/smoke on forest images.

Web interface: https://mcdominik.github.io/forest_watchdog_front

## Desctiption
Fullstack ML aplication with python+fastAPI.
The model was trained and is working in PyTorch.

## Backend Repository

https://github.com/mcdominik/forest_watchdog

## MODEL

I used ResNet18 with pretrained weights and modified last layer to be binary (one neuron). I did simple 5 epoch training on kaggle dataset (link in the last paragraph). It was my first net in PyTorch and I had trouble with accuracy and loss measurements while training. I don't attach model charts because I basically don't know how model performs. I did some "manual" tests on new images and I predict pretty well.

# PROBLEMS

### WHAT CAN IMPROVE THE MODEL

The model has one big problem, when trees have red leaves (autumn photos), model predict it as fire. The solution should be to add some red-leaves pictures to training dataset and basic augumentation with some filters, different saturation etc.
