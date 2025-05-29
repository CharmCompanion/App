import { Link } from 'react-router-dom';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="logo">Charm Companion</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/loadouts">Loadouts</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/lfg">LFG</Link>
        <Link to="/events">Events</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/guides">Guides</Link>
        <Link to="/mastery">Mastery</Link>
      </nav>
    </div>
  );
}