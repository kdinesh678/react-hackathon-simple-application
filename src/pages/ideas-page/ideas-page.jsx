import { BatchPrediction, ThumbUpSharp } from "@mui/icons-material";
import { Card, Chip, Button, Menu, MenuItem } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getAllIdeas, updateIdea } from "../../external/external-proxy";
import { formatDate } from "../../util";

import "./ideas-page.css";

export function IdeasPage(props) {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const _ideas = getAllIdeas();
    setIdeas(_ideas);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedIdeas, setExpandedIdeas] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const sortByCreatedDate = useCallback(() => {
    const _ideas = ideas.sort(
      (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    );
    setIdeas(_ideas);
    setAnchorEl(null);
  }, [ideas]);

  const sortByVotes = useCallback(() => {
    const _ideas = ideas.sort((a, b) => b.votes - a.votes);
    setIdeas(_ideas);
    setAnchorEl(null);
  }, [ideas]);

  const expandIdea = useCallback(
    (evt) => {
      let ideaId = evt.currentTarget.getAttribute("id");

      const filteredExpandedIdeas = expandedIdeas.filter((id) => id !== ideaId);
      if (filteredExpandedIdeas.length !== expandedIdeas.length) {
        setExpandedIdeas(filteredExpandedIdeas);
        console.log(filteredExpandedIdeas);
      } else {
        setExpandedIdeas([...expandedIdeas, ideaId]);
      }
    },
    [expandedIdeas]
  );

  const upVoteIdea = useCallback(
    (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      const id = evt.currentTarget.getAttribute("data-ideaid");
      const idea = ideas.find((idea) => idea.ideaId === id);

      const result = updateIdea({ ...idea, votes: idea.votes + 1 });

      if (result) {
        setIdeas(result);
      }
    },
    [ideas]
  );

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
          <MenuItem onClick={sortByCreatedDate}>Most Recent</MenuItem>
          <MenuItem onClick={sortByVotes}>Most Voted</MenuItem>
        </Menu>
        <Button
          variant="contained"
          onClick={props.goToCreatePage}
          startIcon={<BatchPrediction />}
        >
          Add new idea
        </Button>
      </div>
      <div className="ideas-page-content">
        {ideas.map((idea) => {
          return (
            <Card
              id={idea.ideaId}
              className={`idea-container ${
                !expandedIdeas.includes(idea.ideaId) ? "collapsed" : ""
              }`}
              onClick={expandIdea}
            >
              <div className="idea-header">
                <div className="left">
                  <div className="title">{idea.title}</div>

                  <div className="tags-container">
                    {idea.tags.map((tag) => (
                      <Chip id={tag} className="tag" label={tag} />
                    ))}
                  </div>
                </div>
                <div className="right">
                  <div
                    className="votes"
                    data-ideaid={idea.ideaId}
                    onClick={upVoteIdea}
                  >
                    <ThumbUpSharp />
                    <span>{idea.votes}</span>
                  </div>
                  <div className="user-info">
                    Created By {idea.createdBy} on{" "}
                    {formatDate(idea.createdDate)}
                  </div>
                </div>
              </div>
              <div className="idea-content">{idea.description}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
