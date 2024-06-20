package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private int rating;

    private String comment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date reviewDate;

    private String response;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private UserAccount customer;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private UserAccount staff;

    public Review() {
    }

    public Review(int rating, String comment, Date reviewDate, String response, Room room, UserAccount customer, UserAccount staff) {
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.response = response;
        this.room = room;
        this.customer = customer;
        this.staff = staff;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public UserAccount getCustomer() {
        return customer;
    }

    public void setCustomer(UserAccount customer) {
        this.customer = customer;
    }

    public UserAccount getStaff() {
        return staff;
    }

    public void setStaff(UserAccount staff) {
        this.staff = staff;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Review review)) return false;
        return getRating() == review.getRating() && Objects.equals(getReviewId(), review.getReviewId()) && Objects.equals(getComment(), review.getComment()) && Objects.equals(getReviewDate(), review.getReviewDate()) && Objects.equals(getResponse(), review.getResponse()) && Objects.equals(getRoom(), review.getRoom()) && Objects.equals(getCustomer(), review.getCustomer()) && Objects.equals(getStaff(), review.getStaff());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getReviewId(), getRating(), getComment(), getReviewDate(), getResponse(), getRoom(), getCustomer(), getStaff());
    }

    @Override
    public String toString() {
        return "Review{" +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", reviewDate=" + reviewDate +
                ", response='" + response + '\'' +
                ", room=" + room +
                ", customer=" + customer +
                ", staff=" + staff +
                '}';
    }
}
