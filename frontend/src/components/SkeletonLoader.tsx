import { Skeleton, Stack, SkeletonCircle, SkeletonText, Box, Button } from '@chakra-ui/react'
import React from 'react'

function SkeletonLoader() {
    const [isLoaded, setIsLoaded] = React.useState(false)
    return (
        <Stack padding={4} spacing={1} height={`100%`} border={`2px solid red`}>
            <Skeleton height='20%' isLoaded={isLoaded}>
            </Skeleton>
            <Skeleton
                height='20%'
                isLoaded={isLoaded}
                bg='green.500'
                color='white'
                fadeDuration={1}
            >
            </Skeleton>
            <Skeleton
                height='20%'
                isLoaded={isLoaded}
                fadeDuration={4}
                bg='blue.500'
                color='white'
            >
            </Skeleton>
        </Stack>
    )
  }

export default SkeletonLoader;