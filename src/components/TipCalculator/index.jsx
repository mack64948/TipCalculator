import "./index.css"
import { useState } from "react";
import dollarIcon from "../../assets/icon-dollar.svg"
import personIcon from "../../assets/icon-person.svg"

export const TipCalculator = () => {
    const [bill, setBill] = useState(0)
    const [numberPeople,setNumberPeople] = useState(1)
    const [isCustomTip, setIsCustomTip] = useState(false)
    const [tipPercent, setTipPercent] = useState(0.00)
    const [selectedButton, setSelectedButton] = useState(0)

    const [hasBillError, setHasBillError] = useState(false)
    const [hasNumberPeopleError, setHasNumberPeopleError] = useState(false)
    const [hasCustomTipError,setHasCustomTipError] = useState(false)

    const getTotalAmountPerPerson = () => {
        let amount = bill/numberPeople
        amount = amount.toFixed(2)
        return isNaN(amount) && numberPeople > 0 ? 0.00 : amount;
    }

    const getTipAmountPerPerson = () => {
        let totalTip = bill*tipPercent
        totalTip = (totalTip/numberPeople).toFixed(2)
        return isNaN(totalTip) && numberPeople > 0 ? 0.00 : totalTip;
    }

    let errorStyle = { 
        color: "red", 
        fontStyle: "italic"
    }

    const getTipPctButtonStyle = (buttonNum) => {
        let selectedButtonStyle = {
            backgroundColor: "hsl(172, 67%, 45%)",
            color: "hsl(180, 14%, 10%)"
        }
    
        let regularButtonStyle = {
            backgroundColor: "hsl(184, 14%, 56%)",
            color: "white"
        }

        let regularCustomButton = {
            backgroundColor: "white",
            border: "thin solid hsl(186, 14%, 43%)",
            color: "hsl(186, 14%, 43%)"
        }

        

        if(buttonNum === 6){
            return selectedButton === buttonNum ? selectedButtonStyle : regularCustomButton; 
        }

        return selectedButton === buttonNum ? selectedButtonStyle : regularButtonStyle; 
    }

    const clearInputFields = () => {
        let billInput = document.querySelector('#bill-input')
        let numberPeopleInput = document.querySelector('#number-people-input')
        billInput.value = ""
        numberPeopleInput.value = ""
    }

    const checkEmptyFieldHandler = (e, callback) => {
        if(e.target.value == null || e.target.value === undefined || e.target.value === ""){
            callback();
            return false;
        }

        return true;
    }

    return (<div className="main-container">
        <div className="container-left">

            <div style={{position:"relative"}} className="bill-input-container">
                <label for="bill-input">Bill</label>  
                <div> 
                <img src={dollarIcon} style={{
                    position: "absolute",
                    top: "27%",
                    left: "10px"
                }}/>
                <input className="bill-amount-input" onFocus={(e) => {
                    checkEmptyFieldHandler(e,()=>{setHasBillError(false)})
                    
                }} onBlur={(e) => {
                    checkEmptyFieldHandler(e,()=>{setHasBillError(false)})

                }} onChange={(e)=>{

                    if(!checkEmptyFieldHandler(e,() => {
                        setHasBillError(true)
                        
                    })) { return }

                    let userBill = parseFloat(e.target.value)
                    if(!isNaN(userBill) && userBill >= 0){
                        setBill(e.target.value);
                        setHasBillError(false)
                    } else {
                        setHasBillError(true)
                    }
                    
                }} id="bill-input" type="text">
                </input></div> 
                {hasBillError && <p style={errorStyle}>Bill amount is invalid</p>}
            </div> 

            <div className="tip-selection-container">
                <button style={getTipPctButtonStyle(1)} onClick={() => { 
                    setSelectedButton(1);
                    setIsCustomTip(false)
                    setTipPercent(0.05) 
                    }}>5%</button> 
                <button style={getTipPctButtonStyle(2)} onClick={() => { 
                    setSelectedButton(2);
                    setIsCustomTip(false)
                    setTipPercent(0.10) }}>10%</button> 
                <button style={getTipPctButtonStyle(3)} onClick={() => { 
                    setSelectedButton(3)
                    setIsCustomTip(false)
                    setTipPercent(0.15) }}>15%</button> 
                <button style={getTipPctButtonStyle(4)} onClick={() => { 
                    setSelectedButton(4)
                    setIsCustomTip(false)
                    setTipPercent(0.25) }}>25%</button> 
                <button style={getTipPctButtonStyle(5)} onClick={() => { 
                    setSelectedButton(5)
                    setIsCustomTip(false)
                    setTipPercent(0.5) }}>50%</button> 
                <button style={getTipPctButtonStyle(6)} onClick={() => {
                    setSelectedButton(6)
                    setIsCustomTip(!isCustomTip);
                }}>Custom</button> 
                { isCustomTip && <div class="custom-tip-container" style={{width: "100%"}}>
                    <div style={{display:"flex",gap: "10px", alignItems: "center", width: "100%", textAlign: "left"}}>
                    <label for="custom-tip-input">Enter percentage: </label>
                    <input onChange={(e) => {

                        if(e.target.value === ""){
                            setHasCustomTipError(false)
                            return
                        }
                        let tipPercentage = parseFloat(e.target.value)

                        if(isNaN(tipPercentage) || tipPercentage === null || tipPercentage === undefined ){
                            setHasCustomTipError(true)
                            return;
                        }
                        if(tipPercentage >= 0){
                            setTipPercent(e.target.value/100)
                            setHasCustomTipError(false)
                        } else {
                            setHasCustomTipError(true)
                        }
                }} type="text" id="custom-tip-input"></input></div> 
                    {hasCustomTipError && <p style={errorStyle}>Invalid Custom Tip Amount</p>}
                    </div>}
            </div>

            <div style={{position: "relative"}} className="number-people-input-container">
          
                <label for="number-people-input">Number of People</label>    
                <div style={{position: "relative"}}>
                    <img style={{
                        position: "absolute",
                        left: "7px",
                        top: "35%"
                    }} src={personIcon}/>
                <input type="text" onFocus={(e) => {
                    checkEmptyFieldHandler(e,()=>{setHasNumberPeopleError(false)})
                    
                }} onBlur={(e) => {
                    checkEmptyFieldHandler(e,()=>{setHasNumberPeopleError(false)})

                }} onChange={(e)=>{

                    if(!(checkEmptyFieldHandler(e,() => { setHasBillError(true) }))){
                        return
                    }

                    let numVal = parseInt(e.target.value);

                    if(isNaN(numVal) || numVal < 0){
                        setHasNumberPeopleError(true)
                        return;
                    }

                    if(numVal >= 0){
                        setHasNumberPeopleError(false)
                        setNumberPeople(numVal)
                    }

                }} id="number-people-input"></input> 
                </div>
               {hasNumberPeopleError &&  <p style={errorStyle}>Invalid number of people</p>}
              
            </div>
        </div>

        <div className="container-right">
           <div className="tip-amount-output-container">
                <p><span className="output-label-top">Tip Amount</span><br/><span className="output-label-bottom" >/ person</span></p>
                <p className="tip-per-person-text">${getTipAmountPerPerson()}</p>
           </div>

           <div className="total-amount-output-container">
                <p><span className="output-label-top">Total Amount</span><br/><span className="output-label-bottom">/ person</span></p>
                <p className="total-per-person-text">${getTotalAmountPerPerson()}</p>            
           </div>

           <button onClick={(e) => {
                setHasBillError(false)
                setHasNumberPeopleError(false)
                setHasCustomTipError(false)
                setBill(0.00)
                setTipPercent(0.00)
                setIsCustomTip(false)
                setNumberPeople(1)
                clearInputFields()
                
           }}>Reset</button>
        </div>

    </div>);
}