import PropTypes from 'prop-types';
import Button from "./Button";

// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>  
//         </header>
//     ) 
// }

const Header = ({title, onAdd, showAdd}) => {
    return (
        <header className="header">
            <h1>{title}</h1>  
            <Button 
                color ={showAdd ? 'green' : 'red'} 
                text={showAdd ? 'Add' : 'Close'} 
                onClick={onAdd} />
        </header>
    ) 
}

Header.defaultProps = {
    title : 'Hello',
}

Header.prototype = {
    title:PropTypes.string,
}
export default Header
