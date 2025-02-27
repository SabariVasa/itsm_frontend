import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Rating,
  Button,
  Skeleton,
} from "@mui/material";
import parse from "html-react-parser";
import axios from "axios";
import { KnowledgeContext } from "./KnowledgeContainer";
import { serverAPI } from "../../Utils/Server";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function KnowledgeList() {
  const [loading, setLoading] = useState(true);
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { searchTerm } = useContext(KnowledgeContext);
  const { theme } = useTheme();

  async function loadKnowledgeArticles() {
    try {
      const res = await axios.get(`${serverAPI}/knowledge_article_service/all_articles`, {
        auth: {
          username: "admin",
          password: "admin@123",
        },
      });
      setKnowledgeData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadKnowledgeArticles();
  }, []);

  // Filter Articles based on Search Term
  const filteredArticles = knowledgeData.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.articleContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to trim content
  const trimContent = (content, isExpanded) => {
    const lines = content.split("\n");
    if (lines.length > 250 && !isExpanded) {
      return {
        trimmed: lines.slice(0, 250).join("\n") + " ...",
        isTrimmable: true,
      };
    }
    return { trimmed: content, isTrimmable: false };
  };

  return (
    <div style={{ display: "flex", marginTop: "2em" }}>
      <Grid item xs={12} style={{ padding: "1em 0 1em 1em" }}>
        <Box>
          {loading ? (
            <Skeleton variant="rectangular" height={600} />
          ) : filteredArticles && filteredArticles.length > 0 ? (
            filteredArticles.map((item, index) => {
              const { trimmed, isTrimmable } = trimContent(item.articleContent, isExpanded);
              return (
                <Card key={index} variant="outlined" sx={{ marginBottom: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: `${theme.valueFontColor}`, cursor: "pointer" }}>
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                          {parse(trimmed)}
                        </Typography>
                        {isTrimmable && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => setIsExpanded(!isExpanded)}
                            sx={{ marginTop: 1 }}
                          >
                            {isExpanded ? "Show Less" : "Show Full Content"}
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" color="textSecondary">
                          Authored By: {item.date}
                        </Typography>
                        <Rating value={item.rating} readOnly precision={0.1} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography variant="body2" sx={{ color: "#FF0000", fontSize: "20px" }}>
              No articles found
            </Typography>
          )}
        </Box>
      </Grid>
    </div>
  );
}