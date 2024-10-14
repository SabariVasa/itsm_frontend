{/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style.modalPosition}>
          <div style={{display:"flex",flexDirection:"row",alignContent:"center",width:"100%",justifyContent:"flex-end"}}>
           <CancelIcon style={{cursor:"pointer",color:"orange",fontSize:30,marginBottom:25}} onClick={handleClose}/>
           </div>
           <Grid container rowSpacing={1} sx={{width:"80%",display:"flex",alignItems:"center"}} columnSpacing={{xs:1, sm: 2, md: 3 }}>
           <Grid item xs={6}>
              <Autocomplete disablePortal id="combo-box-demo" options={requesItems} value={props.selectedItem} onChange={(event, newValue) => { props.setSelectedItem(newValue);}} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Select Item" />}/>
           </Grid>
           <Grid item xs={6}>
              <IncrementContainer title={"Select Quantity"} value={props.quantity} setValue={props.setQuantity}/>
           </Grid> 
            </Grid>   */}
           {/* <Grid container rowSpacing={1} sx={{width:"80%",display:"flex",alignItems:"center"}} columnSpacing={{xs:1, sm: 2, md: 3 }}>
           <Grid item xs={6}>
            <div style={{width:"107%",marginLeft:-70}}>
               <CmdbDate label="Due Date" />
            </div>
           </Grid>
            </Grid>   */}
             {/* <Stack style={{display:'flex',alignItems:"center",justifyContent:"right",paddingRight:20,paddingTop:20,paddingBottom:10}} direction="row">
              <Button variant="contained"  color="primary" style={{width:120}} onClick={()=>{
                AddItem()
                storeDataOffline()
              }}>Add Item</Button>
        </Stack>
        </Box>
      </Modal> */}