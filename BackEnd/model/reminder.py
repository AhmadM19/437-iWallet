
import datetime
from app import db, ma

class Reminder(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    amount = db.Column(db.Float,  nullable=False)
    added_date = db.Column(db.DateTime)
    auto_pay=db.Column(db.Boolean)
    paid=db.Column(db.Boolean)
    date=db.Column(db.DateTime)
    description=db.Column(db.String(50),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False) 
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False) 


    def __init__(self, amount, user_id,receiver_id,auto_pay,description,due_date):
        super(Reminder, self).__init__(
        user_id=user_id,
        receiver_id=receiver_id,
        auto_pay=auto_pay,
        description=description,
        amount=amount,
        added_date=datetime.datetime.now(),
        paid=False,
        date=due_date)
class ReminderSchema(ma.Schema):
    class Meta:
        fields = ("id", "amount", "description" , "receiver_id" , "date" , "added_date" ,"auto_pay","paid")
        model = Reminder