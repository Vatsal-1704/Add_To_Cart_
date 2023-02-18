import '../App.css';

function Header(props) {
    return (
        <div className='flex shopping-card'>
            <div onClick={() => props.handleShow(false)} >Shopping </div>
            <div className='V3'> Shopping Cart With Firebase</div>
            <div onClick={() => props.handleShow(true)}> Cart
                <sup> {props.count} </sup>
            </div>
        </div>
    );
}

export default Header;
