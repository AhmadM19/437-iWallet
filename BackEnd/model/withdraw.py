
import datetime
from app import db, ma

class Withdraw(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    amount = db.Column(db.Float,  nullable=False)
    added_date = db.Column(db.DateTime )
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)  

    def __init__(self, amount,user_id):
        super(Withdraw, self).__init__(amount=amount,
        user_id=user_id,
        added_date=datetime.datetime.now())


class WithdrawSchema(ma.Schema):
    class Meta:
        fields = ("id", "amount", "added_date")
        model = Withdraw