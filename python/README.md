# GOAL

The goal of this project is to have a demo app where some technologies can be tried and showcased.

The biggest focus of this python project is to test the experimental proposal for a new type of web frameworks using the async keword, as showcased on Djangocon2019

some other technologies tested here is the new poetry package builder, and using sqlalchemy as a database system. Black was also used for formating. Pytest is bundeled to be implemented in the future.

## Using the app

install python>3.6
install poetry
`poetry install`
`poetry shell`
`python app.py`

## Disclaimer
even though the secrets and database are not do be commited to version control,they are bundeled in for now.

# TODO
1. implement sorting(waiting for order_by to be finished and merged on encode/orm#6)
2. implement better serialization to minimize code reuse
3. test diferent aproaches for lazy loading of modules
4. implement tests

