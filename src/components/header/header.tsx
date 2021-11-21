import "./header.css";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Header = () => {

    return(
        <section className="header-section">
            <div className="header-img-container">
                <img src="https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/b_AllSoulsquad.jpg?itok=tTcH-5ix" alt="profile-background" className="profile-background" />
            </div>
            <div className="header-personal">
                <div className="profile-img">
                    <img src="https://media.istockphoto.com/photos/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a-picture-id1139459625?b=1&k=20&m=1139459625&s=170667a&w=0&h=zVpBlAmdwUDWIVf0Zxtb3idMCitol4nzII2qde8Ybag=" alt="profile-img" />
                </div>
                <div className="header-personal-detail">
                    <h1>Kadin Campbell</h1>
                    <p>Social Studies</p>
                </div>
            </div>

            <aside className="sidebar">
                    <h1>Friends</h1>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary="Cassidy" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary="John" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary="Hanh" />
                            </ListItemButton>
                        </ListItem>
                    </List>
            </aside>

        </section>
    )
}

export default Header;