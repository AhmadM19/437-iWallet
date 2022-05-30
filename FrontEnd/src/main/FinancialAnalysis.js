import {React,useState,useEffect, useCallback} from 'react'; 
import Grid from '@mui/material/Grid'; 
import  Typography  from '@mui/material/Typography'; 
import PieChart from './Charts/PieChart'; 
import BarGraph from './Charts/BarGraph'; 
import Button from '@mui/material/Button'; 
import regression from 'regression';

 
 
export default function FinancialAnalysis({SERVER_URL,userToken}){ 
 
  //Mapping numbers to months
 const Month={
    1:'January',
    2:'February',
		3:'March',
		4:'April',
		5:'May',
		6:'June',
		7:'July',
		8:'August',
		9:'September',
		10:'October',
		11:'November',
		12:'December'
 }

 //All states for financial analysis
let [income_min,setIncome_min]=useState(0); 
let [income_max,setIncome_max]=useState(0); 
let [income_std,setIncome_std]=useState(0); 
let [income_avg,setIncome_avg]= useState(0); 
 
let [expense_min,setExpense_min]=useState(0); 
let [expense_max,setExpense_max]=useState(0); 
let [expense_std,setExpense_std]=useState(0); 
let [expense_avg,setExpense_avg]= useState(0); 
 
let [expense_graph,setExpense_graph]=useState([[],[],[],[],[],[]]); 
let [income_graph,setIncome_graph]=useState([[],[],[],[],[],[]]); 

let [predict_type,setPredict_type]=useState(0);
let [predict_time,setPredict_time]=useState(1);
let [predict_output,setPredict_output]=useState([]);

 //Function to fetch statistics from the backend
const fetchStat = useCallback(() => { 
 
  fetch(`${SERVER_URL}/fetchAnalysis`,{ 
    method:"GET", 
    headers:{ 
      "Content-Type":"application/json", 
      Authorization: `bearer ${userToken} `
    } 
  }) 
  .then(response => response.json()) 
  .then(data => { 
     setIncome_min(data.incomemin); 
     setIncome_max(data.incomemax); 
     setIncome_std(data.incomestd); 
     setIncome_avg(data.incomeaverage); 
 
     setExpense_min(data.expensemin); 
     setExpense_max(data.expensemax); 
     setExpense_std(data.expensestd); 
     setExpense_avg(data.expenseaverage); 
 
     setExpense_graph(data.expensegraph); 
     setIncome_graph(data.incomegraph); 
   } 
); 
}) 
 
useEffect(fetchStat, []); 

//Function to predict values of income or expenses using linear regression
function Predict(e,predict_type,predict_time){
  e.preventDefault();
  var x=0;
  //Income prediction
  if(predict_type==0){

      const result=regression.linear(income_graph)
      x = Number( income_graph[0][0] + Number(predict_time)) %12
      predict_output= result.predict(x)
      setPredict_output(predict_output[1])


  }
  //Expenses prediction
  else{
      const result=regression.linear(expense_graph)
      x = (expense_graph[0][0]+Number(predict_time)) %12
      predict_output= result.predict(x)
      setPredict_output(predict_output[1])
  }
  

}
 
  return ( 
    <Grid container > 
        <Grid item sx={{height:300}} xs={6}> 
          <Typography color="white" align="center" variant="h6" sx={{fontWeight:'bold'}}>Income</Typography> 
          <PieChart  min={income_min} max={income_max} std={income_std} avg={income_avg}/> 
        </Grid> 
        <Grid item sx={{height:300}} xs={6}> 
          <Typography color="white" align="center" variant="h6" sx={{fontWeight:'bold'}}>Expenses</Typography> 
          <PieChart min={expense_min} max={expense_max} std={expense_std} avg={expense_avg}/> 
        </Grid> 
        <Grid item  sx={{height:300}} xs={6}> 
        <Typography color="white" align="center" variant="h6" sx={{fontWeight:'bold'}}>Graph</Typography> 
          <BarGraph income_graph={income_graph} expense_graph={expense_graph}/> 
        </Grid> 
        <Grid item  sx={{height:300}} xs={6}> 
            <Typography align="center" variant="h6" sx={{fontWeight:'bold',color:"white"}}>Future Values</Typography> 
            <Typography align="center" variant="body1" sx={{color:"white"}}>Choose your options</Typography> 
            <select variant="outlined" size='small' value={predict_type} onChange={ (e) => setPredict_type(e.target.value)}> 
              <option value={0}>Income</option> 
              <option value={1}>Expenses</option> 
            </select> 
            <select variant="outlined" size='small' value={predict_time} onChange={ (e) => setPredict_time(e.target.value)}> 
              <option value={1}>After 1 Month</option> 
              <option value={2}>After 2 Months</option> 
              <option value={3}>After 3 Months</option> 
            </select> 
            <br></br> 
            <br></br> 
            <Button className="Button" variant="contained" onClick={(e) => Predict(e,predict_type,predict_time)} > Predict</Button> 
            <br></br> 
            <br></br> 
            <Typography align="center" variant="body1" sx={{color:"white"}}>{predict_output}</Typography> 
                       
        </Grid> 
    </Grid>  
  ) 
}