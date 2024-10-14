import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../global/commonComponents/ThemeContext';

export default function IncidentCard(props) {
  const { theme } = useTheme();
  console.log(theme, 'IncidentCard')
  return (
    <Link style={{ textDecoration: "none" }} to={props.route}>
      <div className='incidentCard' style={{ background: theme.IncidentCardColor }}>
        <p style={{ fontWeight: 900, color: "white", fontSize: 40, marginTop: 5 }}>{props.total}</p>
        <p style={{ fontWeight: 900, color: "white", fontSize: 20, marginTop: -35 }}>{props.title}</p>
      </div>
    </Link>
  )
}
