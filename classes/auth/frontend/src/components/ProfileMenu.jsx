import Dropdown from "react-bootstrap/Dropdown";
import { PersonCircle } from "react-bootstrap-icons"; // optional icon

function ProfileMenu() {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle id="profile-dropdown" className="border-0">
        <PersonCircle size={28} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileMenu;
