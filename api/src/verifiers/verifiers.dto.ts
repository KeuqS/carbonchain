import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VerifierApplicationStatus } from './verifier-application.entity';

const STELLAR_ADDRESS_EXAMPLE =
  'GBCI2DH7MEKQUTCXZ7YLEVOZHDMBWPCMB6V46ZQHOUN2BHBWRWYY2JRP';

export class VerifierReputationResponseDto {
  @ApiProperty({ example: STELLAR_ADDRESS_EXAMPLE })
  address!: string;

  @ApiProperty({ example: 42, description: 'Number of approved credits' })
  approvalCount!: number;

  @ApiProperty({ example: 1, description: 'Number of disputes' })
  disputeCount!: number;
}

export class VerifierResponseDto {
  @ApiProperty({ example: STELLAR_ADDRESS_EXAMPLE })
  address!: string;

  @ApiPropertyOptional({ example: 'Acme verifier node', nullable: true })
  name?: string | null;

  @ApiPropertyOptional({
    example: ['CreditApproval', 'MRVReview'],
    type: [String],
  })
  capabilities?: string[];

  @ApiPropertyOptional({ type: VerifierReputationResponseDto, nullable: true })
  reputation?: VerifierReputationResponseDto | null;

  @ApiPropertyOptional({
    example: '2026-10-13T12:00:00.000Z',
    format: 'date-time',
    nullable: true,
  })
  registeredAt?: Date | null;

  @ApiPropertyOptional({
    example: '2026-10-13T12:05:00.000Z',
    format: 'date-time',
    nullable: true,
  })
  syncedAt?: Date | null;

  @ApiPropertyOptional({
    example: false,
    description: 'True when the database record is missing on-chain',
  })
  unstable?: boolean;
}

export class MinStakeResponseDto {
  @ApiProperty({ example: '1000000000', description: 'Amount in stroops' })
  minStake!: string;
}

export class StakeResponseDto {
  @ApiProperty({ example: STELLAR_ADDRESS_EXAMPLE })
  address!: string;

  @ApiProperty({ example: '25000000', description: 'Amount in stroops' })
  stake!: string;
}

export class StakeDepositRequestDto {
  @ApiProperty({
    example: 'CAS3J5QW4D6Y7Z8A9B0C1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8',
    description: 'Stellar Asset Contract address for the stake token',
  })
  @IsString()
  @IsNotEmpty()
  tokenId!: string;

  @ApiProperty({
    example: '25000000',
    description: 'Positive amount in stroops',
  })
  @IsString()
  @IsNotEmpty()
  amount!: string;

  @ApiProperty({ example: '7', description: 'Replay-protection nonce' })
  @IsString()
  @IsNotEmpty()
  nonce!: string;
}

export class StakeWithdrawRequestDto {
  @ApiProperty({
    example: 'CAS3J5QW4D6Y7Z8A9B0C1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8',
    description: 'Stellar Asset Contract address used for the deposit',
  })
  @IsString()
  @IsNotEmpty()
  tokenId!: string;

  @ApiProperty({ example: '8', description: 'Replay-protection nonce' })
  @IsString()
  @IsNotEmpty()
  nonce!: string;
}

export class VerifierApplicationRequestDto {
  @ApiProperty({ example: STELLAR_ADDRESS_EXAMPLE })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ example: 'Acme verifier node' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: ['CreditApproval', 'MRVReview'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  capabilities!: string[];

  @ApiProperty({ example: 'bafybeigdyrzt5exampledocumentscid' })
  @IsString()
  @IsNotEmpty()
  documentsCid!: string;

  @ApiProperty({
    example: 'CAS3J5QW4D6Y7Z8A9B0C1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8',
  })
  @IsString()
  @IsNotEmpty()
  stakeToken!: string;

  @ApiProperty({ example: '25000000', description: 'Initial stake in stroops' })
  @IsString()
  @IsNotEmpty()
  stakeAmount!: string;
}

export class VerifierApplicationResponseDto {
  @ApiProperty({ example: STELLAR_ADDRESS_EXAMPLE })
  address!: string;

  @ApiProperty({ example: 'Acme verifier node', nullable: true })
  name!: string | null;

  @ApiProperty({ example: ['CreditApproval', 'MRVReview'], type: [String] })
  capabilities!: string[];

  @ApiProperty({ example: 'bafybeigdyrzt5exampledocumentscid', nullable: true })
  documentsCid!: string | null;

  @ApiProperty({
    example: 'CAS3J5QW4D6Y7Z8A9B0C1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8',
    nullable: true,
  })
  stakeToken!: string | null;

  @ApiProperty({ example: '25000000', nullable: true })
  stakeAmount!: string | null;

  @ApiProperty({
    enum: VerifierApplicationStatus,
    example: VerifierApplicationStatus.Pending,
  })
  status!: VerifierApplicationStatus;

  @ApiProperty({ example: null, nullable: true })
  reviewedBy!: string | null;

  @ApiProperty({ example: '2026-10-13T12:00:00.000Z', format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-10-13T12:00:00.000Z',
    format: 'date-time',
    nullable: true,
  })
  updatedAt!: Date | null;
}

export class VerifierApplicationReviewRequestDto {
  @ApiProperty({
    enum: VerifierApplicationStatus,
    enumName: 'VerifierApplicationStatus',
    example: VerifierApplicationStatus.Approved,
  })
  @IsEnum(VerifierApplicationStatus)
  status!: VerifierApplicationStatus;
}
