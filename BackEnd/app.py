import datetime
from venv import create
from flask import Flask, request 
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify,abort
from flask_cors import CORS     
from flask_marshmallow import Marshmallow
import jwt
import statistics
from sqlalchemy import func,extract


app = Flask(__name__)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
from config import SECRET_KEY , DB_CONFIG
app.config['SQLALCHEMY_DATABASE_URI']=DB_CONFIG
db = SQLAlchemy(app)

from model.user import User, UserSchema
from model.transaction import Transaction , TransactionSchema
from model.reminder import Reminder , ReminderSchema
from model.deposit import Deposit , DepositSchema
from model.withdraw import Withdraw , WithdrawSchema

user_schema = UserSchema()  
get_user_schema=UserSchema(many=True)
transaction_schema = TransactionSchema()
get_transaction_schema= TransactionSchema(many=True)
reminder_schema=ReminderSchema()
get_reminder_schema= ReminderSchema(many=True)
withdraw_schema=WithdrawSchema()
get_withdraw_schema=WithdrawSchema(many=True)
deposit_schema=DepositSchema()
get_deposit_schema=WithdrawSchema(many=True)
def average(list):
        sum= 0
        if not len(list) == 0:
            for i in list:
                sum += i
            sum /= len(list)
        return sum


def sum(list):
        sum= 0
        if not len(list) == 0:
            for i in list:
                sum += i.amount
        return sum


def create_token(user_id):
        payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=4),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
        }
        return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
        )


def extract_auth_token(authenticated_request):
    auth_header = authenticated_request.headers.get('Authorization')
    if auth_header:
        return auth_header.split(" ")[1]
    else:
        return None
def decode_token(token):
    payload = jwt.decode(token, SECRET_KEY, 'HS256')
    return payload['sub']

@app.route('/signup', methods=['POST'])
def user():
    user_name= request.json["user_name"]
    password= request.json["password"]
    mail= request.json["mail"]
    full_name= request.json["full_name"]
    my_user=User(user_name,password,mail,full_name,0.0)
    db.session.add(my_user)
    db.session.commit()
    return jsonify(user_schema.dump(my_user))


@app.route('/login', methods=['POST'])
def login():
    user_name= request.json["user_name"]
    password= request.json["password"] 
    print(user_name,password)
    if user_name=="" or password=="":
        abort(400)
    user = User.query.filter_by(user_name=user_name).first()
    if user==None :
        abort(403)      
    else:
        if bcrypt.check_password_hash(user.hashed_password, password):
            return jsonify({"token":create_token(user.id)})
        else :
            abort(403)



@app.route('/Withdraw', methods=['POST'])
def withdraw():
    amount = request.json["amount"] 
    user_id = request.json["user_id"]
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else :
        try:
            admin_id=decode_token(valid)
            user=User.query.filter(User.id == user_id).first()
            if user.balance<=amount:
                user.balance-=amount
                withdraw=Withdraw(amount,user_id) 
            else:
                abort(404)
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    db.session.add(withdraw)
    db.session.commit()
    return jsonify(withdraw_schema.dump(withdraw))

@app.route('/getWithdraws', methods=['GET'])
def get_withdraw():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            user_id=decode_token(valid)
            LIST= Withdraw.query.filter(Withdraw.user_id == user_id).all()
       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    return jsonify(get_withdraw_schema.dump(LIST))


@app.route('/Deposit', methods=['POST'])
def deposit():
    amount = request.json["amount"] 
    user_id = request.json["user_id"]
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else :
        try:
            decode_token(valid)
            user=User.query.filter(User.id == user_id).first()
            user.balance+=amount
            deposit=Deposit(amount,user_id)
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    db.session.add(deposit)
    db.session.commit()
    return jsonify(deposit_schema.dump(deposit))

@app.route('/getDeposits', methods=['GET'])
def get_deposit():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            user_id=decode_token(valid)
            LIST= Deposit.query.filter(Deposit.user_id == user_id).all()
       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    return jsonify(get_deposit_schema.dump(LIST))


@app.route('/getBalance', methods=['GET'])
def get_balance():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            user_id=decode_token(valid)
            user= User.query.filter(User.id== user_id).first()
            balance=user.balance
       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    return jsonify({"balance":balance})



@app.route('/Transfer', methods=['POST'])
def transaction():
    amount = request.json["amount"] 
    receiver_id = request.json["receiver_id"] 
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else :
        try:
            user_id =decode_token(valid)
            sender=User.query.filter(User.id == user_id).first()
            if sender.balance>=amount and user_id!=receiver_id:
                sender.balance-=amount
                receiver=User.query.filter(User.id == receiver_id).first()
                receiver.balance+=amount
            else:
                abort(404)
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    transaction=Transaction(amount,user_id,receiver_id) 
    db.session.add(transaction)
    db.session.commit()
    return jsonify(transaction_schema.dump(transaction))

    


@app.route('/getTransactions', methods=['GET'])
def get_transaction():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            user_id=decode_token(valid)
            LIST= Transaction.query.filter(Transaction.sender_id == user_id).all()
            LIST2= Transaction.query.filter(Transaction.receiver_id == user_id).all()
            LIST+=LIST2
       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    return jsonify(get_transaction_schema.dump(LIST))




@app.route('/PostReminder', methods=['POST'])
def reminder():
    amount = request.json["amount"] 
    receiver_id = request.json["receiver_id"]
    auto_pay = request.json["auto_pay"] 
    description = request.json["description"] 
    due_date = request.json["due_date"] 
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else :
        try:
            user_id=decode_token(valid)
            if user_id!=receiver_id:
                reminder=Reminder(amount,user_id,receiver_id,auto_pay,description,due_date) 
            else:
                abort(404)
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    db.session.add(reminder)
    db.session.commit()
    return jsonify(reminder_schema.dump(reminder))


@app.route('/getReminders', methods=['GET'])
def get_reminder():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            user_id=decode_token(valid)
            LIST= Reminder.query.filter(Reminder.user_id == user_id).all()
       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    return jsonify(get_reminder_schema.dump(LIST))


@app.route('/fetchTables', methods=['GET'])
def fetch_tables():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            decode_token(valid)
            USERTABLE= User.query.all()
            USERTABLE=get_user_schema.dump(USERTABLE)
            TRANSACTIONTABLE= Transaction.query.all()
            TRANSACTIONTABLE=get_transaction_schema.dump(TRANSACTIONTABLE)
       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    return jsonify({"USERTABLE":USERTABLE,
                    "TRANSACTIONTABLE":TRANSACTIONTABLE})





@app.route('/fetchAnalysis', methods=['GET'])
def fetch_analysis():
    valid=extract_auth_token(request)
    if valid == None:
        abort(403)
    else:
       try:
            user_id=decode_token(valid)
            NOW=datetime.datetime.now().month
            print(NOW)
            incomegraph=[]
            expensegraph=[]
            x=[]
            incomelist=[]
            expenselist=[]
            for i in range (0,6):
                BEFORE=NOW-i
                if BEFORE==0:
                    BEFORE=12

                LIST=Transaction.query.filter(func.month(Transaction.added_date)==BEFORE,Transaction.sender_id == user_id).all()
                LIST2=Transaction.query.filter(func.month(Transaction.added_date)==BEFORE,Transaction.receiver_id == user_id).all()
                x.append(BEFORE)
                incomelist.append(sum(LIST2))
                expenselist.append(sum(LIST))               
                
                incomegraph.append([BEFORE,sum(LIST2)])
                expensegraph.append([BEFORE,sum(LIST)])

                

       except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            abort(403)
    
    
    
    
    
    
    return jsonify({"incomegraph":incomegraph,"expensegraph":expensegraph,
    "incomestd":statistics.stdev(incomelist),
    "incomemedian":statistics.median(incomelist),
    "incomemin":min(incomelist),
    "incomemax":max(incomelist),
    "incomeaverage":average(incomelist),
    "expensestd":statistics.stdev(expenselist),
    "expensemedian":statistics.median(expenselist),
    "expensemin":min(expenselist),
    "expensemax":max(expenselist),
    "expenseaverage":average(expenselist)

    })
