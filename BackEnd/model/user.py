
from app import db, ma , bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(30), unique=True)
    mail=db.Column(db.String(50),nullable=False,unique=True)
    fullname=db.Column(db.String(30),nullable=False,unique=True)
    hashed_password = db.Column(db.String(128))
    balance=db.Column(db.Float(),nullable=False)
    def __init__(self, user_name, password , mail , full_name,balance):
        super(User, self).__init__(user_name=user_name , mail=mail ,fullname=full_name,balance=balance)
        self.hashed_password = bcrypt.generate_password_hash(password) 
    

class UserSchema(ma.Schema):
    class Meta:
        fields = ("user_name","id","mail","full_name","balance")
        model = User