import React from "react";
import Items from "./Items";
import AvailableDiscounts from "./AvailableDiscounts";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from "@material-ui/core";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDiscounts: AvailableDiscounts,
      items: Items,
      finalPrice: 0,
      subTotal: 0,
      promotionPrice: 0,
      shipping: false,
      shippingPrice: 0,
      selectedItemEdit: {},
      selectedItemRemove: {},
      openModal: false,
      discountCode: ""
    };
    this.displayProducts = this.displayProducts.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.displayHeaderDetails = this.displayHeaderDetails.bind(this);
    this.editItems = this.editItems.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.discountOnChange = this.discountOnChange.bind(this);
  }

  componentDidMount() {
    this.calculatePrice();
  }

  editItems(event, item) {
    event.preventDefault();
    this.setState({ openModal: true, selectedItemEdit: item });
  }

  removeItem(event, item) {
    event.preventDefault();
    this.setState({ selectedItemRemove: item });
    let stateItems = this.state.items;
    let subTotal = 0;
    let finalPrice = 0;
    let shipping = false;
    let index = stateItems.findIndex(
      itemvalue => itemvalue.product === item.product
    );
    stateItems.splice(index, 1);
    stateItems = stateItems.map(item => {
      item.price = item.ogPrice * item.qty;
      subTotal += item.price;
    });
    finalPrice = finalPrice + this.state.shippingPrice;
    finalPrice = subTotal - this.state.promotionPrice;
    if (finalPrice > 50) {
      shipping = true;
    }
    this.setState({
      items: stateItems,
      subTotal: subTotal,
      finalPrice: finalPrice,
      shipping: shipping
    });

    this.calculatePrice();
  }

  discountOnChange(event) {
    this.setState({ discountCode: event.target.value });
  }

  applyDiscount(e) {
    this.state.availableDiscounts.filter(discount => {
      if (discount.discountCode === this.state.discountCode) {
        this.setState({ promotionPrice: discount.discountValue });
      }
    });
    this.calculatePrice();
  }

  calculatePrice() {
    let stateItems = this.state.items;
    let subTotal = 0;
    let finalPrice = 0;
    let shipping = false;
    stateItems.map(item => {
      item.price = item.ogPrice * item.qty;
      subTotal += item.price;
    });
    finalPrice += this.state.shippingPrice;
    finalPrice = subTotal - this.state.promotionPrice;
    if (finalPrice > 50) {
      shipping = true;
    }
    this.setState({
      items: stateItems,
      subTotal: subTotal,
      finalPrice: finalPrice,
      shipping: shipping
    });
  }

  handleQuantityChange(event, product) {
    let stateItems = this.state.items;
    let subTotal = 0;
    let finalPrice = 0;
    let shipping = false;
    stateItems.map(item => {
      if (item.product === product) {
        item.qty = event.target.value;
        item.price = item.ogPrice * item.qty;
      }
      subTotal += item.price;
    });
    finalPrice = subTotal - this.state.promotionPrice;
    if (finalPrice > 50) {
      shipping = true;
    }
    this.setState({
      items: stateItems,
      subTotal: subTotal,
      finalPrice: finalPrice,
      shipping: shipping
    });
  }

  displayHeaderDetails() {
    return (
      <div style={{ height: "130px" }}>
        <AppBar position="position">
          <h2 align="left">YOUR SHOPPING CART</h2>
          <h4 align="left">
            If the cart is completely empty then we shall again add back
            products for you
          </h4>
        </AppBar>
      </div>
    );
  }

  displayProducts() {
    return (
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{this.state.items.length} ITEMS</TableCell>
            <TableCell align="right">SIZE</TableCell>
            <TableCell align="right">QTY</TableCell>
            <TableCell align="right">PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.items.map(item => (
            <TableRow key={item.product}>
              <TableCell component="th" scope="row">
                <div style={{ display: "inline", width: "100px" }}>
                  <span style={{ display: "inline" }}>
                    <img
                      key={item.product}
                      src={item.url}
                      style={{ width: "75px", height: "75px" }}
                    />
                    <br />
                    <span>{item.product}</span>
                    <br />
                    <span align="right">Color:{item.color}</span>
                    <br />
                    <span>
                      <Link
                        href="#"
                        style={{ display: "inline" }}
                        onClick={e => this.editItems(e, item)}
                      >
                        Edit
                      </Link>
                      <br />
                      <Link
                        href="#"
                        style={{ display: "inline" }}
                        onClick={e => this.removeItem(e, item)}
                      >
                        Remove
                      </Link>
                      <br />
                      <Link href="#" style={{ display: "inline" }}>
                        Save For Later
                      </Link>
                    </span>
                  </span>
                </div>
              </TableCell>
              <TableCell align="right">{item.size}</TableCell>
              <TableCell align="right">
                <input
                  type="number"
                  value={item.qty}
                  style={{ width: "50px" }}
                  onChange={e => this.handleQuantityChange(e, item.product)}
                />
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={1} />
            <TableCell>
              ENTER PROMO CARD OR GIFT CARD(use CODE:A15 and get RS.50 disount)
            </TableCell>
            <TableCell align="right">
              <input
                type="text"
                value={this.state.discountCode}
                onChange={e => this.discountOnChange(e)}
              />
            </TableCell>
            {/* <TableCell colSpan={1} /> */}
            <TableCell>
              <Button
                align="right"
                onClick={e => this.applyDiscount(e)}
                color="primary"
              >
                Apply
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>SUB TOTAL</TableCell>
            <TableCell align="right">{this.state.subTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>PROMOTION CODE APPLIED</TableCell>
            <TableCell align="right">{}</TableCell>
            <TableCell align="right">{this.state.promotionPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ESTIMATED SHIPPING*</TableCell>
            <TableCell align="right">{}</TableCell>
            <TableCell align="right">
              {this.state.shipping ? "FREE" : "50"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>ESTIMATED TOTAL</TableCell>
            <TableCell align="right">{this.state.finalPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2} align={"right"}>
              Continue Shopping
            </TableCell>
            <TableCell align={"right"}>CHECKOUT</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  handleClose() {
    this.setState({ openModal: false });
  }

  showModalPanel() {
    return (
      <div>
        <Dialog
          open={this.state.openModal}
          onClose={e => this.handleClose(e)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <h3>Product Details:</h3>
            <br />
          </DialogTitle>
          <DialogContent>
            <div>
              <img
                src={this.state.selectedItemEdit.url}
                style={{ width: "75px", height: "75px" }}
              />
              <h4>Size</h4>:{this.state.selectedItemEdit.availableSize}
              <h4>Price </h4>:{this.state.selectedItemEdit.ogPrice}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={e => this.handleClose(e)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        );
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.displayHeaderDetails()}
        {this.displayProducts()}
        {this.state.openModal && this.showModalPanel()}
      </div>
    );
  }
}
