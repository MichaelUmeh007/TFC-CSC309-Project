from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from phonenumber_field.phonenumber import PhoneNumber, to_python
import re


def validate_international_phonenumber(value):
    phone_number = to_python(value)
    if isinstance(phone_number, PhoneNumber) and not phone_number.is_valid():
        raise ValidationError(
            _("Enter a valid phone number (e.g. (506) 234-5678) or a number with an international call prefix."), code="invalid_phone_number"
        )

def validate_security_code(value):
    regex = '^\d{3,4}$'
    result = re.match(regex, value)
    if not result:
        raise ValidationError(
            _("Please enter a valid security code."), code="invalid"
        )
def validate_credit_card(value):
    regexes = ['^4[0-9]{12}(?:[0-9]{3})?$', '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$',
               '^3[47][0-9]{13}$', '^3(?:0[0-5]|[68][0-9])[0-9]{11}$', '^6(?:011|5[0-9]{2})[0-9]{12}$', '^(?:2131|1800|35\d{3})\d{11}$']
    match = False
    for pattern in regexes:
        if re.match(pattern, value):
            match =True
    if not match:
                raise ValidationError(
            _("Please enter a valid credit card number."), code="invalid"
        )

