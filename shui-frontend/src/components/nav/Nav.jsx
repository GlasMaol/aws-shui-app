import React from 'react';
import { Link } from 'browser-router-dom'

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/delete" role="link" aria-label="Link to delete page."></Link>
                </li>
                <li>
                    <Link to="/user" role="link" aria-label=" Link to user messages page."></Link>
                </li>
                <li>
                    <Link to="/edit" role="link" aria-label="Link to edit page."></Link>
                </li>
            </ul>
        </nav>
    )
}
