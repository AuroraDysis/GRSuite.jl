"""
    fdm_dissipation_order(accuracy_order::Integer)

Calculate the order of dissipation needed for a given finite difference accuracy order [Babiuc:2007vr](@cite).
For a scheme of accuracy order 2r-2, returns dissipation order 2r.
"""
function fdm_dissipation_order(accuracy_order::Integer)
    @argcheck iseven(accuracy_order) "Only even orders are supported."
    r = div(accuracy_order + 2, 2)
    return 2r
end

"""
    fdm_dissipation_weights([TR=Rational{Int}], diss_order::Integer)

Calculate the weights for Kreiss-Oliger dissipation of given order [Babiuc:2007vr](@cite).
"""
function fdm_dissipation_weights(::Type{TR}, diss_order::Integer) where {TR<:Real}
    @argcheck iseven(diss_order) "Only even orders are supported."
    r = div(diss_order, 2)
    wts = fdm_central_weights(TR, diss_order, 2)
    @.. wts = (-1)^(r + 1) * wts / 2^(2 * r)
    return wts
end

function fdm_dissipation_weights(diss_order::TI) where {TI<:Integer}
    return fdm_dissipation_weights(Rational{TI}, diss_order)
end

"""
    fdm_dissipation_boundary_weights([TR=Rational{Int}], diss_order::Integer)

Calculate the weights for Kreiss-Oliger dissipation of given order at the boundary [Babiuc:2007vr](@cite).
"""
function fdm_dissipation_boundary_weights(::Type{TR}, diss_order::Integer) where {TR<:Real}
    @argcheck iseven(diss_order) "Only even orders are supported."
    r = div(diss_order, 2)
    wts_left, wts_right = fdm_boundary_weights(TR, diss_order, 2)
    @.. wts_left = (-1)^(r + 1) * wts_left / 2^(2 * r)
    @.. wts_right = (-1)^(r + 1) * wts_right / 2^(2 * r)

    return wts_left, wts_right
end

function fdm_dissipation_boundary_weights(diss_order::TI) where {TI<:Integer}
    return fdm_dissipation_boundary_weights(Rational{TI}, diss_order)
end

"""
    fdm_dissipation_matrix(::Type{TR}, diss_order::Integer, n::Integer; transpose::Bool=false)

Create a finite difference dissipation matrix with specified dissipation order.

# Arguments
- `TR`: The element type of the matrix
- `diss_order::Integer`: The order of the dissipation operator
- `n::Integer`: The size of the matrix
- `transpose::Bool=false`: Whether to return the transpose of the matrix
"""
function fdm_dissipation_matrix(
    ::Type{TR}, diss_order::Integer, n::Integer; transpose::Bool=false
) where {TR<:Real}
    op = fdm_dissop(diss_order, one(TR), one(TR))
    num_side = op.num_side
    wts = op.wts

    dissmat = BandedMatrix(Zeros{TR}(n, n), (num_side, num_side))

    @inbounds for i in (num_side + 1):(n - num_side)
        dissmat[i, (i - num_side):(i + num_side)] .= wts
    end

    if transpose
        dissmat_T = similar(dissmat)
        transpose!(dissmat_T, dissmat)
        return dissmat_T
    else
        return dissmat
    end
end

export fdm_dissipation_order, fdm_dissipation_weights, fdm_dissipation_boundary_weights, fdm_dissipation_matrix
