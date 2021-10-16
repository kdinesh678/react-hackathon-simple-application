import { BatchPrediction, ThumbUpSharp } from "@mui/icons-material";
import { Card, Chip, Button, Menu, MenuItem } from "@mui/material";
import React, { useMemo } from "react";
import { getAllIdeas } from "../../external/external-proxy";

import "./ideas-page.css";

export function IdeasPage() {
  const ideas = useMemo(() => {
    const _ideas = getAllIdeas();

    return _ideas;
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ideas-page-container">
      <div className="ideas-page-header">
        <Button
          variant="contained"
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Sort By
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Most Recent</MenuItem>
          <MenuItem onClick={handleClose}>Most Voted</MenuItem>
        </Menu>
        <Button variant="contained" startIcon={<BatchPrediction />}>
          Add new idea
        </Button>
      </div>
      {ideas.map((idea) => {
        return (
          <Card id={idea.ideaId} className="idea-container">
            <div className="idea-header">
              <div className="left">
                <div className="title">{idea.title}</div>

                <div className="tags-container">
                  {idea.tags.map((tag) => (
                    <Chip className="tag" label={tag} />
                  ))}
                </div>
              </div>
              <div className="right">
                <div className="votes">
                  <ThumbUpSharp />
                  <span>{idea.votes}</span>
                </div>
                <div className="user-info">
                  Created By {idea.createdBy} on {idea.createdDate}
                </div>
              </div>
            </div>
            <div className="idea-content">{idea.description}</div>
          </Card>
        );
      })}
    </div>
  );
}
