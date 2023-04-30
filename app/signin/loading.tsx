"use client";
import Information from "@/components/fields/SignInfo/Information";
import { Avatar, Container, Skeleton, Stack } from "@mui/material";
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
        <Skeleton variant="circular" width={60} height={56}>
          <Avatar />
        </Skeleton>

        <Skeleton variant="text" sx={{ fontSize: "2rem", mb: 2 }} width={200} />
        <Skeleton variant="rounded" width={400} height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width={400} height={56} sx={{ mb: 4 }} />
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
