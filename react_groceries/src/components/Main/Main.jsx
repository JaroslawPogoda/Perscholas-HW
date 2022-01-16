import React, { Component } from "react";
import Form from "./Form/Form";
import GroceryItem from "./GroceryList/GroceryItem";
import data from "../../Data/Data";
import PurchasedItem from "./PuchasedItem/PurchasedItem";
import "./Main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: data,
      purchased: [],
    };
  }
  getGrocery = (grocery) => {
    console.log(grocery.isPurchased);
    grocery.isPurchased = false;
    this.setState({ groceries: [...this.state.groceries, grocery] });
  };
  addToPurchased(grocery) {
    console.log(grocery);
    this.setState(
      { purchased: [...this.state.purchased, grocery] },
      console.log(this.state)
    );
  }
  handleIsPurchased = (isPurchased, index) => {
    const groceriesPurchased = [];
    this.setState((groceries) => {
      const grocerylist = this.state.groceries.map((grocery, indexitem) => {
        if (index === indexitem) {
          grocery.index=index;
          grocery.isPurchased = isPurchased;
          groceriesPurchased.push(grocery);
          return grocery;
        } else {
          return grocery;
        }
      });
      return { grocerylist };
    }, this.addToPurchased(groceriesPurchased));
  };
  handleIsPurchased2 = (isPurchased, index,quantity) => {
    const groceriesPurchased = [];
    this.setState(
      { purchased: [...this.state.purchased.slice(0, index),...this.state.purchased.slice(index + 1)] },
      this.setState(groceries=>{return this.state.groceries.map((grocery,index2)=>{
        if(this.state.purchased[index][0].index===index2){
          grocery.isPurchased=false;
          grocery.quantity=0
        }
        return grocery
      })},console.log(this.state))
      
    );
    
    //this.setState({groceries:{...this.state.groceries,isPurchased:false}},console.log(this.state))
  };
  
  handleOnChangeQuantity = (event,index) => {
    this.setState(groceries=>{return this.state.groceries.map((grocery,index2)=>{
      if(index===index2){
        grocery.quantity=event}
    return grocery})})
  };
  render() {
    return (
      <div className="Main">
        <div className="Main-Form">
        <h2 className="PurchasedTitle">Add item to Grocery List</h2>
          <Form className="Form" getGrocery={this.getGrocery} />
        </div>
        <div className="Main-Grocery">
        <h2 className="PurchasedTitle">Grocery List</h2>
          {this.state.groceries.map((groceryItem, index) => {
            return groceryItem.isPurchased ? (
              <div key={index}></div>
            ) : (
              <GroceryItem
                className="Grocery "
                buttonName="buy"
                title={"Grocery Item"}
                handleOnChangeQuantity={this.handleOnChangeQuantity}
                handleIsPurchased={this.handleIsPurchased}
                grocery={groceryItem}
                index={index}
                key={index}
              />
            );
          })}
        </div>
        <div className="Main-Purchased">
          <h2 className="PurchasedTitle">Purchased List</h2>
          {this.state.purchased.map((groceryItem, index) => {
            console.log(groceryItem[0]);
            return groceryItem[0].isPurchased ? (
              <GroceryItem
                className="Purchased "
                buttonName="cancel"
                title={"Purchased Item"}
                handleOnChangeQuantity={this.handleOnChangeQuantity}
                handleIsPurchased={this.handleIsPurchased2}
                grocery={groceryItem[0]}
                index={index}
                key={index}
              />
            ) : (
              <div key={index}></div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Main;
