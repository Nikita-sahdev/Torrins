import React, { useEffect } from 'react';
import { FormInput } from '../../Utility/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Action/auth.actions';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NewsLetterSubscriptionSchema } from '../../ValidationSchema/NewsLetterSubscriptionSchema';

const schema = NewsLetterSubscriptionSchema;

const NewsLetter = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = (data) => {
        dispatch(auth.newsLetterSubscription({ email: data.email }));
        reset();
    };

    return (
        <div className="subscribe">
            <p>Subscribe to our newsletter</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FormInput
                        id="email"
                        type="text"
                        identity="email"
                        name="email"
                        autoComplete="off"
                        register={register("email")}
                        error={errors?.email}
                        placeholder="Enter your email here"
                    />
                </div>

                {authState.newsletterLoading ? (
                    <button className="btn-subscribe" disabled>Loading...</button>
                ) : (
                    <button className="btn-subscribe" type="submit">Subscribe</button>
                )}
            </form>
        </div>
    );
};

export default NewsLetter;
