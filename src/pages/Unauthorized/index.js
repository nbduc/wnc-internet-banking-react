import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div>
            Unauthorized
            <br/>
            <Link to="/logout">Logout</Link>
        </div>
    );
}

export default Unauthorized;