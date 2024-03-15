import * as React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import avatarPic from "../../Assets/Images/avater.png"
import { styled } from '@mui/material/styles';
import "./ContactBox.css"

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "",
    // height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

export default function ContactBox() {
    return (
        <Stack direction="row" spacing={2}>
            <DemoPaper square={false} sx={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                <div className='profileDetails'>
                    <div className='profileDetailsTextProfile'>
                        <Avatar sx={{ width: "70px", height: "70px" }} alt="Travis Howard" src={avatarPic} />
                        <div className='profileDetailsText'>
                            <div className='bold'>Mick</div>
                            <div>Member since Feb 2016</div>
                            <div className='bold'>See Profile</div>
                        </div>
                    </div>
                    <div className='contactBtnsContainer'>
                        <div className='contactBtns'>
                            <Button sx={{ backgroundColor: "#002F34", fontWeight: "700", margin: "1rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0" }} variant="contained">
                                <LocalPhoneOutlinedIcon /> <span className='phoneText'> Show Phone Number</span>
                            </Button>
                        </div>
                        <div className='contactBtns'>
                            <Button sx={{ fontWeight: "700", margin: "1rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0", border: "2px solid #002F34", color: "#002F34" }} variant="outlined">
                                <ChatBubbleOutlineOutlinedIcon /> <span className='phoneText'> Chat</span>
                            </Button>
                        </div>
                    </div>
                </div>

            </DemoPaper>
        </Stack>
    );
}