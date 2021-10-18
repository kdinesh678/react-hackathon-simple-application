import { ArrowBack } from "@mui/icons-material";
import { Chip, TextField, Card, IconButton, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { addNewIdea } from "../../external/external-proxy";
import "./create-idea-page.css";

export function CreateIdeasPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const createIdea = useCallback(() => {
    if (title && description && tags.length) {
      addNewIdea({ title, description, tags });
    }
  }, [title, description, tags]);

  const setTitleCallback = useCallback((evt) => {
    setTitle(evt.target.value);
  }, []);
  const setDescriptionCallback = useCallback((evt) => {
    setDescription(evt.target.value);
  }, []);
  const setTagsCallback = useCallback(
    (evt) => {
      const val = evt.currentTarget.getAttribute("data-name");
      const index = tags.findIndex((tag) => tag === val);

      if (index !== -1) {
        const clone = [...tags];
        clone.splice(index, 1);
        setTags(clone);
      } else {
        setTags([...tags, val]);
      }
    },
    [tags]
  );

  return (
    <div className="create-idea-page">
      <Card>
        <div className="create-idea-page-header">
          <div>
            <IconButton onClick={props.goBack}>
              <ArrowBack />
            </IconButton>
          </div>
          <div>Add new idea</div>
        </div>
        <div className="create-idea-page-content">
          <TextField
            label="Title"
            variant="outlined"
            onChange={setTitleCallback}
          />
          <div className="tags-container">
            <div>Tags</div>
            {["feature", "tech"].map((tag) => {
              return (
                <Chip
                  id={tag}
                  data-name={tag}
                  label={tag}
                  color="primary"
                  variant={`${tags.includes(tag) ? "" : "outlined"}`}
                  onClick={setTagsCallback}
                  clickable
                />
              );
            })}
          </div>
          <TextField
            label="Description"
            multiline
            rows={4}
            onChange={setDescriptionCallback}
          />
        </div>
        <div className="create-idea-page-footer">
          <Button variant="contained" onClick={createIdea}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}
