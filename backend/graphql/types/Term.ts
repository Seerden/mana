import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
@InputType("TermWithoutIdsInput")
export class TermWithoutIds {
   @Field()
   to_language: string;

   @Field()
   from_language: string;

   @Field()
   from_value: string;

   @Field()
   to_value: string;
}

@ObjectType()
@InputType("TermWithoutIdInput")
export class TermWithoutId extends TermWithoutIds {
   @Field(() => Int)
   user_id: number;

   @Field(() => Int)
   list_id: number;
}

@ObjectType()
export class Term extends TermWithoutId {
   @Field(() => Int)
   term_id: number;
}

@InputType("TermUpdateInput")
export class TermUpdateInput {
   @Field(() => Int)
   term_id: Term["term_id"];

   @Field(() => String, { nullable: true })
   from_value?: Term["from_value"];

   @Field(() => String, { nullable: true })
   to_value?: Term["to_value"];
}
