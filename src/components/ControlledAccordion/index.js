import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ControlledAccordion({ title, defaultExpanded, children }) {
    const [expanded, setExpanded] = useState(
        defaultExpanded ? defaultExpanded : false
    );
    const handleChange = (event) => {
        setExpanded(!expanded);
    };
    return (
        <Accordion
            expanded={expanded}
            TransitionProps={{ unmountOnExit: true }}
            onChange={handleChange}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
}

export default ControlledAccordion;
