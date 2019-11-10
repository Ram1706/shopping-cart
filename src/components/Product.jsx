import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


export default class Product extends React.Component{


    render(){
        return(<div>
            <div>
            <Container fixed>
               {this.props.product}
            </Container>
            </div>
            <h1>price</h1>{this.props.price}
            <div style={{display:"inline"}}>
            <Link href="#" style={{display:"inline"}}>
                Edit
            </Link>
            <br></br>
            <Link href="#" style={{display:"inline"}}>
                Remove
            </Link>
            <Link href="#" style={{display:"inline"}}>
                Save For Later
            </Link>
            </div>
        </div>)
    }
}
