import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu/>
            <Footer />
        </div>
    );
}

function Header() {
    return <h1 class="headertext" style={{color: "orange", fontSize: "48px", textTransform: "uppercase", display: 'flex', textAlign: 'center'}}>Yong Jin's Pizza Co.</h1>
}

// Pizza component expects a object prop named pizza to be entered
// {
//     name: "Focaccia",
//     ingredients: "Bread with italian olive oil and rosemary",
//     price: 6,
//     photoName: "pizzas/focaccia.jpg",
//     soldOut: false,
// }
// for example is the first pizza to be passed
function Pizza({pizza}) {
    return (
        <div className="pizzabox row">
            <div className="imagebox col">
                <img src={pizza.photoName} alt="spinaci.jpg"></img>
            </div>
            <div className="col">
                <div className="descriptionbox ">
                    <h3 className="pizzaname"><b>{pizza.name}</b></h3>
                    <h6>Ingredients: {pizza.ingredients}</h6>
                    <h6>Price: ${pizza.price}</h6>
                </div>

                {/* Using JSX Conditionals && and The Ternary Operator, different things can be rendered depending on conditions,
                Preventing the Add to cart button to be rendered when sold out is one such feature */}
                <div className="buttonbox">
                    <p>{pizza.soldOut ? <span style={{color:'red'}}>Sold Out</span> : <span style={{color:'green'}}>Available</span>}</p>
                    {!pizza.soldOut && <button type="button" className="btn btn-outline-warning addtocart">Add to Cart</button>}
                </div>
                
            </div>
            
        </div>
    )    
}

const date = new Date();
// const testTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
const showTime = date.getHours();
const isOpen = showTime >= 10 && showTime <= 22;

function  Menu () {

    //Holding user query
    const [searchTerm, setSearchTerm] = useState('');
    // to hold the OBJECT that matches the user query
    // filter is a method to return a array containing only the searched item
    const filteredPizzas = pizzaData.filter(pizza =>
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) //this is a TRUE or FALSE
    );
    // to answer how the system will know to display all items when no input query was entered,
    // pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) returning true would mean
    // all pizzas passes filter and will be included in "filteredPizzas"

    return (
        <div className="menu">
            <h5>Opening time: 10:00am - 10:00pm</h5>
            <h2>Our Menu</h2>

            { isOpen && <h4 className="tagline">Authentic Italian cuisine, all from our stone oven</h4>}

            {searchTerm && (
                <h4 className="tagline">Search results for "{searchTerm}"</h4>
            )}

            <input 
                type="text"
                placeholder="Search for pizza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-bar"
            />

            {/* Show a message if no pizzas match */}
            {filteredPizzas.length === 0 && searchTerm && (
                <p>No pizzas found with that name.</p>
            )}

            {/* pizzaData.map takes out all the objects, each object is stored in pizza, and pizza is passed into the Pizza component, which can then access the children */}
            {/* <div className="pizzamenu">
                {pizzaData.map((pizza, index) => (
                    <Pizza key= {index} pizza = {pizza}/>
                ))}
            </div> */}
            
            {/* Display filtered pizzas */}

            <div className="pizzamenu">
                {filteredPizzas.map((pizza, index) => (
                    <Pizza key={index} pizza={pizza} />
                ))}
            </div>

            
        </div>
    )
}

function Order () {
    return ( 
        <div>
            {isOpen ?  (
        <div className="openbox">
            <p>We're currently open</p> 
            <button type="button" className="btn btn-outline-warning">Order</button>
        </div>
        ) : (
        <p>Sorry we're closed</p>
        )}
        </div>
        );
}

// We can't use conditional statements like IF inside the returned JSX, using ternary is a alternative
function Footer() {
    return (
        <footer className="footer"> 
            <Order />   
        </footer>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />)