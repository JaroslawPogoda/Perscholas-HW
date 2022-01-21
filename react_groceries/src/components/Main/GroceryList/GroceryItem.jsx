import React, { Component }from "react";

class GroceryItem extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.grocery
    }
   handleIsPurchased = (event)=>{
    event.preventDefault();
    this.props.handleIsPurchased(!this.state.isPurchased,this.props.index,this.state.quantity)
    this.props.handleOnChangeQuantity?.(this.state.quantity,this.props.index)
   }
   handleOnChangeQuantity = (event)=>{
        this.setState({ [event.target.id]: event.target.value })
        
   }
   
render() {
    
    return(
        <div className="GroceryItem">
            <h2>{this.props.title}</h2>
            <ul>
                <li>Product : {this.props.grocery.item}</li>
                <li>Units: {this.props.grocery.units}</li>
                <li>Quantity: {this.props.grocery.quantity}</li>
            </ul>
            <form action="" onSubmit={this.handleIsPurchased}>
            {this.props.grocery.isPurchased?<div></div>:<input type="text" id="quantity"pattern="[0-9]*" onChange={this.handleOnChangeQuantity}
         value={this.state.quantity} />}
            <button className="isPruchase" disabled={this.state.quantity<1&& !this.props.grocery.isPurchased} >{this.props.buttonName}</button>
            </form>
            
        </div>
    )
}
}
export default GroceryItem;