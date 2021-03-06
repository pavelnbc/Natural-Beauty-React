import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchPlugin from '../components/SearchPlugin';

import { handleMenu, deleteSearchValue, setDropdownMenuOpened, updateCartState, importCategories } from '../actions';

class ToolbarComponent extends Component {
    componentDidMount() {
        this.props.updateCartState();
        this.props.importCategories();
    }

    render() {
        let { match, categories, isDropdownOpened, totalPrice, itemAmount, onMenu, setEmptySearch, setDropdownOpened } = this.props;

        totalPrice = totalPrice.toFixed(2);

        let toolbarClassName = classNames({
            header: true,
            "folded-header": match.params.pages
        });

        let dropdownClassName = classNames({
            "header__dropdown-list": true,
            unfolded: isDropdownOpened
        });

        let dropdownSubList = document.getElementById("sub-list");

        function setDropdownSubMenuClosed() {
            dropdownSubList.classList.toggle('unfolded');
        }

        return (
            <header className={toolbarClassName}>
                <div className="grid">
                    <div className="row">
                        <div>
                            <div className="col-xs-2 col-sm-5 col-md-3 col-lg-3">
                                <div className="header__left">
                                <span className=" header__title">
                                    <div className="header__menu" onClick={onMenu}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <NavLink  className="xsHidden"
                                              name="top"
                                              onClick={setEmptySearch}
                                              to="/"
                                    >
                                        Natural Beauty
                                    </NavLink>
                                </span>
                                </div>
                            </div>
                            <div className="col-xs-7 col-sm-5 col-md-3 col-lg-3">
                                <SearchPlugin/>
                            </div>
                            <div className="header__navigation xsHidden smHidden col-md-6 col-lg-6">
                                <nav onClick={setEmptySearch} className="header__nav-bar">
                                    <ul>
                                        <li className="header__navItem">
                                            <NavLink  to="/products">Our Products</NavLink>
                                        </li>
                                        <li className="header__navItem">
                                            <NavLink  to="/about">About us</NavLink>
                                        </li>
                                        <li className="header__navItem">
                                            <a className="navItem"
                                               href="https://www.usps.com/"
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               title="USPS.com"
                                            >
                                                Order status
                                            </a>
                                        </li>
                                        <li className="header__total header__navItem">
                                            <a>{totalPrice}</a>
                                        </li>
                                        <li className="header__navItem cart-icon">
                                            <NavLink to="/cart">
                                                <span className="header__product-amount">{itemAmount}</span>
                                                <img src="/img/cart.png" alt="cart"/>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-xs-1 col-sm-1 mdHidden lgHidden">
                                <div className="total-amount">
                                    <NavLink to="/cart">{totalPrice}</NavLink>
                                </div>
                            </div>
                            <div className="col-xs-2 col-sm-1 mdHidden lgHidden">
                                <div className="header__dropdown-menu">
                                    <div className="header__dropdown-icon" id="header__dropdown-icon" onClick={setDropdownOpened}>
                                        <div className="header__dropdown-icon-triangle"></div>
                                    </div>
                                    <ul className={dropdownClassName} id="dropdown-list">
                                        <li>
                                            <NavLink className="header__dropdown-listIcon" to="/">Home</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="header__dropdown-listIcon" to="/products">Our Products</NavLink>
                                        </li>
                                        <li className="header__dropdown-listIcon"
                                            id="header__ dropdown-categories"
                                            onClick={setDropdownSubMenuClosed}>
                                            Categories
                                            <ul className="header__dropdown-categories" id="sub-list">
                                                {categories.map((category, index) => {
                                                    return (
                                                        <li key={index} className="header__dropdown-category">
                                                            <NavLink to={`/products/${category.id}`}>
                                                                {category.title}
                                                            </NavLink>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="https://tools.usps.com/go/TrackConfirmAction_input"
                                               target="_blank"
                                               title="USPS.com"
                                               rel="noopener noreferrer"
                                               className="header__dropdown-listIcon"
                                            >
                                                Order Status
                                            </a>
                                        </li>
                                        <li>
                                            <NavLink className="header__dropdown-listIcon" to="/about">About Us</NavLink>
                                        </li>
                                        <li className="header__dropdown-listIcon total-price">{totalPrice}</li>
                                        <li>
                                            <NavLink className="header__dropdown-listIcon" to="/cart">Cart</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

ToolbarComponent.propTypes = {
    match: PropTypes.object,
    categories: PropTypes.array,
    totalPrice: PropTypes.number,
    totalAmount: PropTypes.object || PropTypes.number,
    onMenu: PropTypes.func,
    setEmptySearch: PropTypes.func
};


let mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        totalPrice: state.totalPrice,
        itemAmount: state.cartItems.length ? state.cartItems.length : null,
        isDropdownOpened: state.isDropdownOpened,
        match: ownProps.match
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onMenu: () => dispatch(handleMenu()),
        setEmptySearch: () => dispatch(deleteSearchValue()),
        setDropdownOpened: () => dispatch(setDropdownMenuOpened()),
        updateCartState: () => dispatch(updateCartState()),
        importCategories: () => dispatch(importCategories())
    }
};

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarComponent);

export default Toolbar

/*<DropdownButton pullRight bsStyle={'default'}
                                            title=""
                                            id="toolbar-dropdown"
                                            bsSize="sm"
                            >
                                <MenuItem className="header__navItem" eventKey="1">
                                    <NavLink to="/products">Our Products</NavLink>
                                </MenuItem>
                                <MenuItem  className="header__navItem" eventKey="2">
                                    <NavLink to="/about">About us</NavLink>
                                </MenuItem>
                                <MenuItem title="USPS.com"
                                          eventKey="3"
                                          className="header__navItem"
                                          href="https://www.usps.com/"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                >
                                    <a>Order status</a>
                                </MenuItem>
                                <MenuItem className="header__navItem" eventKey="4">
                                    <FontAwesome name="caret-down"/>
                                    <a>Categories</a>
                                    <ListGroup className="header__shotNav-categories">
                                        {categories.map((category, index) => {
                                            return (
                                                <NavLink key={index}
                                                         to={`/products/${category.id}`}
                                                         className="header__menuItem"
                                                         onClick={setEmptySearch}
                                                >
                                                    <ListGroupItem>
                                                        <FontAwesome name="header__heartbeat" />
                                                        {category.title}
                                                    </ListGroupItem>
                                                </NavLink>
                                            );
                                        })}
                                    </ListGroup>
                                </MenuItem>
                                <MenuItem className="header__navItem header__shot-total" eventKey="5">
                                    <a>{totalPrice}</a>
                                </MenuItem>
                                <MenuItem className="header__navItem" eventKey="6">
                                    <NavLink  to="/cart">
                                        Cart
                                    </NavLink>
                                </MenuItem>
                            </DropdownButton>*/

/*<Navbar className={toolbarClassName}>
            <Grid>
                <Row className="show-grid">
                    <Col xs={2} sm={4} md={3} lg={3}>
                        <Row className="show-grid">
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Navbar.Brand>
                                    <FontAwesome name="bars" size="2x" onClick={onMenu}/>
                                </Navbar.Brand>
                            </Col>
                            <Col xsHidden sm={10} md={10} lg={10}>
                                <Navbar.Brand>
                                    <NavLink className="header-title"
                                             name="top"
                                             onClick={setEmptySearch}
                                             to="/"
                                    >
                                        Natural Beauty
                                    </NavLink>
                                </Navbar.Brand>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={8} sm={5} md={3} lg={3} lgOffset={1}>
                        <SearchPluginContainer />
                    </Col>
                    <Col xsHidden smHidden md={6} lg={5}>
                        <Nav onClick={setEmptySearch}>
                            <li className="navItem">
                                <NavLink  to="/products">Our Products</NavLink>
                            </li>
                            <li className="navItem">
                                <NavLink  to="/about">About us</NavLink>
                            </li>
                            <li className="navItem">
                                <a className="navItem"
                                   href="https://www.usps.com/"
                                   target="_blank" rel="noopener noreferrer"
                                   title="USPS.com"
                                >
                                    Order status
                                </a>
                            </li>
                            <li className="navItem excluding">
                                <a className="total">{totalPrice}</a>
                            </li>
                            <li className="navItem cart-icon">
                                <NavLink to="/cart">
                                    <span className="product-amount">{itemAmount}</span>
                                    <img src="/img/cart.png" alt="cart"/>
                                </NavLink>
                            </li>
                        </Nav>
                    </Col>
                    <Col className="shotNav"  xs={2} sm={3} mdHidden lgHidden>
                        <DropdownButton pullRight bsStyle={'default'}
                                        title=""
                                        id="toolbar-dropdown"
                                        bsSize="sm"
                        >
                            <MenuItem className="navItem" eventKey="1">
                                <NavLink to="/products">Our Products</NavLink>
                            </MenuItem>
                            <MenuItem  className="navItem" eventKey="2">
                                <NavLink to="/about">About us</NavLink>
                            </MenuItem>
                            <MenuItem title="USPS.com"
                                      eventKey="3"
                                      className="navItem"
                                      href="https://www.usps.com/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                            >
                                <a>Order status</a>
                            </MenuItem>
                            <MenuItem className="navItem" eventKey="4">
                                <FontAwesome name="caret-down"/>
                                <a>Categories</a>
                                <ListGroup className="shotNav-categories">
                                    {categories.map((category, index) => {
                                        return (
                                            <NavLink key={index}
                                                     to={`/products/${category.id}`}
                                                     className="menuItem"
                                                     onClick={setEmptySearch}
                                            >
                                                <ListGroupItem>
                                                    <FontAwesome name="heartbeat" />
                                                    {category.title}
                                                </ListGroupItem>
                                            </NavLink>
                                        );
                                    })}
                                </ListGroup>
                            </MenuItem>
                            <MenuItem className="navItem shot-total" eventKey="5">
                                <a>{totalPrice}</a>
                            </MenuItem>
                            <MenuItem className="navItem" eventKey="6">
                                <NavLink  to="/cart">
                                    Cart
                                </NavLink>
                            </MenuItem>
                        </DropdownButton>
                    </Col>
                </Row>
            </Grid>
        </Navbar>*/

