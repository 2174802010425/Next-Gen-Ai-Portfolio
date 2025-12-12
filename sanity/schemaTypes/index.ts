import { type SchemaTypeDefinition } from "sanity";
import { profile } from "./profile";
import { navigation } from "./navigation";
import { blog } from "./blog";
import { project } from "./project";
import { certification } from "./certification";
import { skill } from "./skill";
import { contact } from "./contact";
import { service } from "./service";
import { education } from "./education";
import experience from "./experience";
import { archievement } from "./archievement";
import testimonial from "./testimonial";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    navigation,
    blog,
    project,
    certification,
    skill,
    contact,
    service,
    education,
    experience,
    archievement,
    testimonial,
    siteSettings
  ],
};
