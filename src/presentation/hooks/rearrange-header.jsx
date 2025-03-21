import { SettingsApplications } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const useRearrange = ({ headers, TriggerElement = Clickicon }) => {
  const [dragHeaders, updateDragHeaders] = useState([]);
  const [open, setOpen] = useState(false);
  const [unwantedHeaders, setUnwantedHeaders] = useState([]);

  useEffect(() => {
    updateDragHeaders(headers);
    setUnwantedHeaders([]);
  }, [headers]);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };
  
    const move = (sourceList, destList, startIndex, endIndex) => {
      const sourceClone = Array.from(sourceList);
      const destClone = Array.from(destList);
      const [removed] = sourceClone.splice(startIndex, 1);
      destClone.splice(endIndex, 0, removed);
  
      return [sourceClone, destClone];
    };
  
    const sourceList =
      source.droppableId === 'drag-header' ? dragHeaders : unwantedHeaders;
    const destList =
      destination.droppableId === 'drag-header' ? dragHeaders : unwantedHeaders;
  
    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorder(sourceList, source.index, destination.index);
      if (source.droppableId === 'drag-header') {
        updateDragHeaders(reorderedItems);
      } else {
        setUnwantedHeaders(reorderedItems);
      }
    } else {
      const [newSourceList, newDestList] = move(
        sourceList,
        destList,
        source.index,
        destination.index
      );
      if (source.droppableId === 'drag-header') {
        updateDragHeaders(newSourceList);
        setUnwantedHeaders(newDestList);
      } else {
        updateDragHeaders(newDestList);
        setUnwantedHeaders(newSourceList);
      }
    }
  };
  

  const dragContext = [{
    header:'Available Headers',
    items:dragHeaders,
    id:'drag-header'
  },{
    header:'Unwanted Headers',
    items:unwantedHeaders,
    id:'unwanted-header'
  }]

  const ReArrangeController = useMemo(
    () => (
      <>
        <TriggerElement onClick={openModal} />
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="profile-modal-title"
          aria-describedby="profile-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "45%",
              height: "87%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "70vh",
                overflow: "scroll",
              }}
            >
              <DragDropContext onDragEnd={handleDragEnd}>
                {dragContext.map(({ header, items, id }, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      key={id}
                    >
                      <h2>{header}</h2>
                      <div style={{ margin: 8 }}>
                        <Droppable droppableId={id} key={id}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                  padding: 4,
                                  position: "static !important",
                                  width: 250,
                                  height: "70vh",
                                }}
                              >
                                {items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.field}
                                      draggableId={item.field}
                                      index={index}
                                    >
                                      {(dragprovided) => {
                                        return (
                                          <div
                                            ref={dragprovided.innerRef}
                                            {...dragprovided.draggableProps}
                                            {...dragprovided.dragHandleProps}
                                            style={{
                                              padding: 8,
                                              margin: "0 0 8px 0",
                                              minHeight: "40px",
                                              backgroundColor: "#540c00",
                                              color: "white",
                                              ...dragprovided.draggableProps
                                                .style,
                                              position: "static !important",
                                            }}
                                          >
                                            {item.headerName}
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
            <div className="mt-3 ml-auto w-fit">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </Box>
        </Modal>
      </>
    ),
    [TriggerElement, open, dragHeaders, unwantedHeaders]
  );

  return ({ 
    ReArrangeController,
    resultHeaders: dragHeaders || [],
  });
};

export const Clickicon = ({onClick}) => (
  <div className="flex items-center justify-end">
    <SettingsApplications onClick={onClick} className="cursor-pointer"/>
  </div>
);
