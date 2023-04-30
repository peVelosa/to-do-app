"use client";
import Information from "@/components/fields/SignInfo/Information";
import { Container, Stack, Skeleton, Avatar, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Stack
        sx={{
          marginTop: 8,
        }}
        alignItems={"center"}
      >
        <Information />
        <Skeleton variant="circular" width={60} height={60}>
          <Avatar />
        </Skeleton>
        <Skeleton variant="text" sx={{ fontSize: "2rem", mb: 2 }} width={200} />
        <Grid container columnSpacing={2} rowGap={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rounded" height={200} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rounded" height={56} />
          </Grid>
        </Grid>
        <Skeleton variant="rounded" width={400} height={40} sx={{ mb: 2 }} />
        <Skeleton
          variant="rounded"
          width={250}
          height={20}
          sx={{ ml: 0, alignSelf: "flex-end" }}
        />
      </Stack>
    </Container>
  );
};

export default Loading;
