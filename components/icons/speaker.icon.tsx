import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SpeakerIcon: React.FC<IconProps> = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zm-2-9v6l5-3-5-3z"
        />
    </Icon>
);