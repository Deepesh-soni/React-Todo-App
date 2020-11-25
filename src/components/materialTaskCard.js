import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue,red,green } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateModal from './UpdateModal'
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from 'axios';
import SimpleSelect from './SimpleSelect';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: 10,
        backgroundColor: blue[100],
        borderRadius: 15,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function MaterialTaskCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [status, setStatus] = React.useState(props.status);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function renderAvatar(status) {
        if(status==="Completed"){
            return <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor: green[400]}}>C</Avatar>
        }else if(status==="Under Progress"){
            return <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor: blue[400]}}>U</Avatar>
        }else if(status==="Failed"){
            return <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor: red[400]}}>F</Avatar>
        }

        return <Avatar aria-label="recipe" className={classes.avatar}>-</Avatar>;
    };

    function updateStatus(updatedStatus) {
        axios.put(`http://localhost:1448/Todo/updateStatusOfTodo?task=${props.task}&updatedStatus=${updatedStatus}`)
            .then(
                res => console.log(res)
            )
            .catch(
                err => console.log(err)
            )

    }

    const progressPercentage = (Math.floor((props.progress / 60000) / (props.totalTime * 60)) * 100) > 100 ? 100 : Math.floor((props.progress / 60000) / (props.totalTime * 60)) * 100;

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={renderAvatar(props.status)}
                    title={props.task}
                />
                <CardContent>
                    <Tooltip title={progressPercentage} aria-label="add">
                        <LinearProgress variant="determinate" value={progressPercentage} />
                        {/* <LinearProgress variant="determinate" value={((props.progress / (60 * 1000)) / (props.totalTime * 60)) * 100} /> */}
                    </Tooltip>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => {
                            axios.delete(`http://localhost:1448/Todo/removeTodo?task=${props.task}`)
                                .then(
                                    res => console.log(res)
                                )
                                .catch(
                                    err => console.log(err)
                                )
                        }}>delete</DeleteIcon>
                    </IconButton>
                    <IconButton aria-label="edit">
                        <EditIcon onClick={() => setModalIsOpen(true)} />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Created At: {props.todo.creationTime}</Typography>
                        <Typography paragraph>Time already passed (in hours): {Math.round(props.progress / (60 * 60 * 1000))}</Typography>
                        <SimpleSelect status={status} setStatus={setStatus} updateStatus={updateStatus} />
                    </CardContent>
                </Collapse>
            </Card>
            <UpdateModal task={props.task} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        </div>
    );
}
