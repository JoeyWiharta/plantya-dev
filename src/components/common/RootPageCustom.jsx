import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const RootPageCustom = (props) => {
    return (
        <React.Fragment>
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-semibold">{props.title}</h1>
                        <p className="text-sm text-muted-foreground">{props.desc}</p>
                    </div>
                    {props.setModalAddOpen && props.buttonLabel && (
                        <div>
                            <Button size="sm" onClick={() => props.setModalAddOpen(true)}>
                                <Plus />
                                <span className="hidden sm:inline">{props.buttonLabel}</span>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}

RootPageCustom.propTypes = {
    title: PropTypes.any,
    desc: PropTypes.any,
    setModalAddOpen: PropTypes.any,
    buttonLabel: PropTypes.any,
    children: PropTypes.any,
};

export default RootPageCustom;